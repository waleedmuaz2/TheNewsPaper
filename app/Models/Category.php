<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table= 'categories';
    protected $fillable=['name'];

    public static function findOrCreate($name)
    {
        $record = self::where('name', $name)->first();
        if ($record) {
            return $record->id;
        } else {
            $newRecord = self::create(['name' => $name]);
            return $newRecord->id;
        }
    }
}
