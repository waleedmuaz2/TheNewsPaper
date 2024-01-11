<?php

namespace App\Interfaces;

interface NewsRepositoryInterface
{
    /**
     * Get News List Through API NEWSAPI.
     * @return array
     */
    public function newsListNEWSAPI():array;

    /**
     * Get News List Through API TheGuardian.
     * @return array
     */
    public function newsListTheGuardian():array;

    /**
     * CHECK into database store if not exist .
     * @param $newsList
     * @return bool
     */
    public function findAndStore($newsList):bool;

    /**
     * Get Article List.
     * @return object
     */
    public function get():object;
}
