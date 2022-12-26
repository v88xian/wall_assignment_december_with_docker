'use strict';

import { validateFields } from '../helpers/form.helper';

import MessageModel from '../models/messages.model';
let messageModel = new MessageModel();


class MessagesController {

    create = async function(req, res){
        let response_data = {status: false, result: {}, error: null };

        try{
            if(!req?.session?.user?.id){
                throw Error("Session not found.");
            }

            let validated_fields_response = await validateFields(req.body, ["message"]);

            if(validated_fields_response.status){

                response_data = await messageModel.createMessageRecord({
                    user_id: req.session.user.id,
                    message: validated_fields_response.result.message
                });
            }
            else{
                response_data.message = "Missing fields";
            }
        }
        catch(error){
            response_data.error = error;
        }

        res.json(response_data);
    }

    delete = async function(req, res){
        let response_data = {status: false, result: {}, error: null };

        try{
            if(!req?.session?.user?.id){
                throw Error("Session not found.");
            }

            let validated_fields_response = await validateFields(req.body, ["message_id"]);

            if(validated_fields_response.status){
                response_data = await messageModel.deleteMessageRecord(validated_fields_response.result.message_id, req.session.user.id);
            }
            else{
                response_data.message = "Missing fields";
            }
        }
        catch(error){
            response_data.error = error;
        }

        res.json(response_data);
    }

}

export default (function Message(){
    return new MessagesController();
})();