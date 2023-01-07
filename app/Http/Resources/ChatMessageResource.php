<?php

namespace App\Http\Resources;

use App\Models\ChatMessage;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatMessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }

    public static function getMessages($fromId = 0)
    {
        $result = [];

        if($fromId < 0){
            $fromId = 0;
        }

        $selectFields = [
            'id',
            'created_at',
            'text',
            'from_user_id',
            'to_user_id',

        ];
        if($fromId == 0){
            $result['messages'] = ChatMessage::orderByDesc('id')
                ->where('created_at', '>=', Carbon::now()->subHours(1))
                ->take(100)
                ->get($selectFields);
        }else{
            $result['messages'] = ChatMessage::orderByDesc('id')
                ->where('id', '>', $fromId)
                ->where('created_at', '>=', Carbon::now()->subHours(1))
                ->take(100)
                ->get($selectFields);
        }
        if($result['messages']->count() > 0){
            $result['last_message_id'] = $result['messages']->first()->id;
        }else{
            $result['last_message_id'] = $fromId;
        }

        $result['messages'] = $result['messages']->toArray();
        usort($result['messages'], function($a, $b){
           if($a['id'] == $b['id']){
               return 0;
           }
           return ($a['id'] > $b['id'])? 1: -1;
        });


        return $result;
    }



    public static function addMessage($fromUserId, $toUserId, $text)
    {
        $user = User::find($fromUserId);
        if(!$user){
            return false;
        }
        $user->last_activity = Carbon::now();
        $user->save();

        $message = new ChatMessage();

        $message->text = $text;
        $message->from_user_id = $fromUserId;
        $message->to_user_id = $toUserId;

        $message->save();

        return $message->id;
    }
}
