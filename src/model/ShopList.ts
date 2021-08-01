import { Model } from "@nozbe/watermelondb";
import { children, text } from "@nozbe/watermelondb/decorators";

export class Lists  extends Model {
    static table = 'lists'

    static associations = {
      articles: { type: 'has_many', foreignKey: 'list_id' },
    }

    @text('name') name;
    
    @children('articles') articles;

}