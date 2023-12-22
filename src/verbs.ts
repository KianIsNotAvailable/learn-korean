type Verb = {
    Korean: string;
    English: string;
    
  };
  
  type verbsType = {
    [key: string]: Verb;
  };
  
const Verbs: verbsType = {
    1: {
        Korean: "가다",
        English: "To Go",
         
    },
    2:{
        Korean: "하다",
        English: "To Do",
        
    },
    3:{
        Korean: "말하다",
        English: "To Talk",
        
    },
    4:{
        Korean: "쓰다",
        English: "To Write",
        
    },
    5:{
        Korean: "있다",
        English: "To Have",
        
    },
    6:{
        Korean: "오다",
        English: "To Come",
        
    },
    7:{
        Korean: "듣다",
        English: "To Listen",
        
    },
    8:{
        Korean: "자다",
        English: "To Fall Asleep",
        
    },
    9:{
        Korean: "일하다",
        English: "To Work",
        
    },
    10:{
        Korean: "주다",
        English: "To Give",
        
    }
};

export default Verbs;
