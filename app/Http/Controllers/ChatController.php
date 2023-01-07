<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendMessageRequest;
use App\Http\Resources\ChatMessageResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class ChatController extends Controller
{

    public function __construct()
    {

    }

    public function sendMessage(SendMessageRequest $request)
    {
        $fromUserId = $request->input('from_user_id');
        $toUserId = $request->input('to_user_id');
        $message = $request->input('message');
        $messageId = ChatMessageResource::addMessage($fromUserId, $toUserId, $message);

        return response()->json(['message_id' => $messageId]);
    }

    /**
     * принимает ид последнего полученного сообщения и отдает список
     * активных юзеров(юзера с активностью за последний час) и
     * если получен ид последнего полученного сообщения то отдает все
     * последующие(не более 100) иначе последние 100.
     * @return \Illuminate\Http\Response
     */
    public function renewChat(Request $request)
    {
        $lastMessageId = $request->input('last_message_id');
        $result = [
            'users' => UserResource::getActiveUsers(),
        ];

        $result = array_merge($result, ChatMessageResource::getMessages($lastMessageId));

        return response()->json($result);
    }
}
