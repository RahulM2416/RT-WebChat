import {io} from 'socket.io-client';

export function connectWS(){
    return io("http://16.176.211.89:3000");
}
