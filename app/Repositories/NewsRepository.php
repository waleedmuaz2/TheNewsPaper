<?php

namespace App\Repositories;

use App\Interfaces\NewsRepositoryInterface;
use App\Models\Article;
use App\Models\Category;
use App\Models\DataSource;
use Illuminate\Support\Facades\Http;

class NewsRepository implements NewsRepositoryInterface
{
    /**
     * Get News List Through API NEWSAPI.
     * @return array
     */
    public function newsListNEWSAPI(): array
    {
        try {
            $param=[
                'country'=>'us',
                'apiKey'=>env('NEWS_NEWS_API_KEY')
            ];
            $newsAPIURL = env('NEWS_NEWS_API_BASE_URL')."/".env('NEWS_NEWS_API_VERSION')."/"."top-headlines";
            $response =  Http::get($newsAPIURL,$param);
            if($response->successful()){
                return $response->json();
            }
            return [];
        }catch (\Exception $e) {
            abort(response()->json(
                $e->getMessage()));
        }
    }

    /**
     * Get News List Through API TheGuardian.
     * @return array
     */
    public function newsListTheGuardian(): array
    {
        try{
            $param=[
                'orderBy'=>'newest',
                'page-size'=>200,
                'api-key'=>env('NEWS_THE_GUARDIAN_API_KEY')
            ];
            $url=env('NEWS_THE_GUARDIAN_BASE_URL').'/search';
            $response = Http::get($url,$param);
            if($response->successful()){
                return $response->json();
            }
            return [];
        }catch (\Exception $e) {
            abort(response()->json(
                $e->getMessage()));
        }

    }

    /**
     * CHECK into database store if not exist .
     * @param $newsList
     * @return bool
     */
    public function findAndStore($newsList): bool
    {
        $nIds = Article::select('n_id')->get()->pluck('n_id')->toArray();
        foreach ($newsList as $news){
            if(!in_array($news['n_id'],$nIds)){
                $category_id = Category::findOrCreate($news['source']);
                $date_source_id = DataSource::findOrCreate($news['dataSource']);
                $dataSet = [
                    "n_id" => $news['n_id'],
                    "title" => $news['title'],
                    "description" => $news['description'],
                    "category_id" =>$category_id,
                    "data_source_id" =>$date_source_id,
                    "url" => $news['url'],
                    "url_to_image" => $news['url_to_image'],
                    "published_at" => $news['published_at'],
                ];
                Article::create($dataSet);
            }
        }
        return true;
    }

    /**
     * Get Article List.
     * @return object
     */
    public function get():object{
        $article = Article::with('category','dataSource');
        if(request('date')){
            $article = $article->where('published_at',request('date'));
        }
        if (request('category')) {
            $article = $article->whereHas('category', function ($query) {
                $query->where('name', request('category'));
            });
        }
        if (request('source')) {
            $article = $article->whereHas('dataSource', function ($query) {
                $query->where('name', request('source'));
            });
        }
        if(request('keyword')){
            $article = $article->where('title','like','%'.request('keyword').'%');
        }
        $shots = Article::with('category','dataSource')->inRandomOrder()->take(10)->get();
        $categories= Category::inRandomOrder()->take(10)->get();
        return (object)[
            'shots'=>$shots,
            'article'=>$article->get(),
            'categories'=>$categories
        ];
    }
}
