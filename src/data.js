import faker from 'faker'



export const createChatData=()=>{

//     const words = ["The sky", "above", "the port", "was", "the color of television", "tuned", "to", "a dead channel", ".", "All", "this happened", "more or less", ".", "I", "had", "the story", "bit by bit", "from various people", "and", "as generally", "happens", "in such cases", "each time", "it", "was", "a different story", ".", "It", "was", "a pleasure", "to", "burn"];
//   const text = [];
//   let x = 7;
//   while (--x) text.push(words[Math.floor(Math.random() * words.length)]);
//   return text.join(" ");
   
    function getRandomInt(max) {
        return Math.floor(Math.random() * max)
      }
      
    let data = []

    
    for(let i=0;i<15;i++){
        let randomTranscript = [{ id:faker.datatype.uuid(),
            alias:faker.name.findName(),
            phone:faker.phone.phoneNumber(),
            attachement:'https://picsum.photos/200/300',
           message: {
                img:null,
                text:faker.lorem.words(getRandomInt(1000))
            }
        }]
        for (let t=1;t<getRandomInt(100);t++){
            if(t%2){
                randomTranscript.push({
                    id:faker.datatype.uuid(),
                    alias:'you',
                    phone:faker.phone.phoneNumber(),
                    attachement:'https://picsum.photos/200/300',
                    message: {
                        img:`${faker.image.nature(150,150)}?random=${faker.datatype.uuid()}`,
                        text:faker.lorem.words(getRandomInt(1000))
                    }
                 })
            }else{
                randomTranscript.push({
                    id:faker.datatype.uuid(),
                    alias:faker.name.findName(),
                    phone:faker.phone.phoneNumber(),
                    attachement:'https://picsum.photos/200/300',
                    message: {
                        img:null,
                        text:faker.lorem.words(getRandomInt(1000))
                    }
                 })
            }
         
        }
        data.push({
            id:faker.datatype.uuid(),
            avatar:`https://i.pravatar.cc/100?u=${faker.datatype.uuid()}`,
            name:faker.name.findName(),
            lastmessage:randomTranscript.at(-1),
            transcript:randomTranscript
        })
        
    }

    return data

}