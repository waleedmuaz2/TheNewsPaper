<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;
    protected $fillable = ['n_id','title', 'description', 'category_id', 'url', 'url_to_image', 'published_at','data_source_id'];
    protected $table = "articles";

    public function category(){
        return $this->hasOne(Category::class,'id','category_id');
    }

    public function dataSource(){
        return $this->hasOne(DataSource::class,'id','data_source_id');
    }

    public function getPublishedAtAttribute(){
        return date('Y-D-m H:i:s', strtotime($this->attributes['published_at']));
    }
}
