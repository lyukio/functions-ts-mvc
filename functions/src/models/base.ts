import {db as _db} from "../main";
import * as moment from "moment";

export type Document = FirebaseFirestore.DocumentData & { 
    createdAt?: Date,
    updatedAt?: Date
}
export abstract class Base { 
    id: string = "";
    fields: Document | FirebaseFirestore.DocumentData;
    readonly db: FirebaseFirestore.CollectionReference;
    constructor(context: string) {
        this.db = _db.collection(context);
    }

    ref() {
        if(this.id.length < 0) {
            let doc = this.db.doc();
            this.id = doc.id;
            return doc;
        }
        return this.db.doc(this.id);
    }

    async save() {
        if(this.id.length > 0) {
            if(!this.fields.createdAt) {
                this.fields.createdAt = moment().toDate();
            } else {
                this.fields.updatedAt = moment().toDate();
            }
            console.log(this.fields);
            await this.db.doc(this.id).set(this.fields, {merge: true});
            return true;
        }
        this.fields.createdAt = moment().toDate();
        let docRef = await this.db.add(this.fields);
        this.id = docRef.id;
        return true;

    }

    async load(id: string) {
        let doc = (await this.db.doc(id).get()).data();
        if(!doc) return null;
        this.fields = doc;
        this.id = id;
        return this;
    }

}