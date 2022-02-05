import { Model } from 'objection';

export class Users extends Model {
    static tableName = "users" 
    static relationMappings = {
        /* address: {
            relation: Model.HasOneRelation,
            modelClass: require("./Addresses").Addresses,
            join: {
                from: "users.address_id",
                to: "addresses.id",
            }
        }, */
    }
}