<?php

namespace App\Http\Controllers\NewsPaper;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArticle;
use App\Interfaces\NewsRepositoryInterface;
use App\Models\Article;
use Illuminate\Http\JsonResponse;

class NewLogsController extends Controller
{
    public $newRepository;
    public function __construct(NewsRepositoryInterface $newRepository)
    {
        $this->newRepository = $newRepository;
    }

    /**
     * New List Local table
     * @return JsonResponse
    */
    public function newsList(): JsonResponse
    {
        $newLists = $this->newRepository->get();
        return jsonFormat($newLists,'success',200);
    }

    /**
     * New Article by Author
     * @return JsonResponse
     */
    public function create(StoreArticle $request){
        $data[]=[
            'n_id'=>$request['title'].now(),
            'title' => $request['title'] ?? "",
            'description' => $request['description'] ?? "",
            'source' => $request['source'],
            'url' => $request['url'],
            'url_to_image' => $request['url_to_image']??"",
            'published_at' =>  now(),
            'dataSource'=>$request['author']
        ];
        $this->newRepository->findAndStore($data);
        return jsonFormat('','successfully store',200);

    }

}
