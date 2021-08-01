import { Model } from "@nozbe/watermelondb";
import {text, relation} from "@nozbe/watermelondb/decorators";

export class Articles extends Model {
    static table = 'articles'
    
    static associations = {
        list: { type: 'belongs_to', key: 'list_id' },
    }
    
      @text('name') name;

    @text('quantity') quantity;

    @relation('lists','list_id') list;

}