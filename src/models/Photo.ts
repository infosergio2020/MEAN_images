import {Schema,model,Document} from 'mongoose';

//en esta parte estamos trabajando con el esquema de mongoose
const schema = new Schema({
    title: String,
    description: String,
    imagePath: String
});


// aca estamos trabajando con typescript
//para que typescript sepa que este dato esta conformado por los atributos del esquema
//tenemos que crear una interfaz

interface IPhoto extends Document{
    title: string;
    description: string;
    imagePath: string;
}

export default model<IPhoto>('Photo',schema);