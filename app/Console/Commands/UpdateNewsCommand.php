<?php

namespace App\Console\Commands;

use App\Interfaces\NewsRepositoryInterface;
use App\Models\Article;
use Illuminate\Console\Command;

class UpdateNewsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update-news';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'update Local Database from News API';

    public $newRepository;
    /**
     * Create a new command instance.
     *
     * @param NewsRepositoryInterface $newRepository
     */
    public function __construct(NewsRepositoryInterface $newRepository)
    {
        parent::__construct();

        $this->newRepository = $newRepository;
    }


    /**
     * Execute the console command.
     */
    public function handle()
    {
        //NEWS-APIs
        $data=[];
        $newsAPILists = $this->newRepository->newsListNEWSAPI();
        foreach ($newsAPILists['articles'] as $articleData) {
            if(!isset($articleData['url'])){
                continue;
            }
            $data[]= [
                'n_id'=>isset($articleData['url'])?$articleData['url']:"",
                'title' => $articleData['title'] ?? "",
                'description' => $articleData['description'] ?? "",
                'source' => $articleData['source']['name'] ?? "",
                'url' => $articleData['url'] ?? "",
                'url_to_image' => $articleData['urlToImage'] ?? "",
                'published_at' => isset($articleData['publishedAt']) ? now()->parse($articleData['publishedAt']) : '' ,
                'dataSource'=>"news-api"
            ];
        }
        //The-Guardian
        $newListsGuardians = $this->newRepository->newsListTheGuardian();
        foreach ($newListsGuardians['response']['results'] as $guardian){
            if(!isset($guardian['id'])){
                continue;
            }
            $data[]= [
                'n_id'=>isset($guardian['id'])?$guardian['id']:"",
                'title' => isset($guardian['webTitle'])?$guardian['webTitle']:"",
                'description' => isset($guardian['webTitle'])?$guardian['webTitle']:"",
                'source' => isset($guardian['sectionName'])?$guardian['sectionName']:"",
                'url' => isset($guardian['webUrl'])?$guardian['webUrl']:($guardian['apiUrl']?? ""),
                'url_to_image' => "",
                'published_at' => isset($guardian['webPublicationDate'])?now()->parse($guardian['webPublicationDate']):'',
                'dataSource'=>"the-guardian"
            ];
        }
        $this->newRepository->findAndStore($data);
        $this->info('News fetched and stored successfully!');

    }
}
