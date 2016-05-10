import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.eclipse.jetty.websocket.api.*;
import org.eclipse.jetty.websocket.api.annotations.*;
import java.io.*;
import java.util.*;
import java.util.concurrent.*;

@WebSocket
public class SocketHandler {
    // Store sessions if you want to, for example, broadcast a message to all users
    private static final Queue<Session> sessions = new ConcurrentLinkedQueue<>();

    @OnWebSocketConnect
    public void connected(Session session) {
        sessions.add(session);
        //logging
        System.out.println("Client Connected: " + session.getLocalAddress());
    }

    @OnWebSocketClose
    public void closed(Session session, int statusCode, String reason) {

        sessions.remove(session);
    }

    @OnWebSocketMessage
    public void message(Session session, String message) throws IOException {
        JsonObject obj = new JsonParser().parse(message).getAsJsonObject();
        String type = obj.get("type").getAsString();
        switch(type) {
            case "text" :  try{
                            String msg = obj.get("message").getAsString();
                            //Logger
                            System.out.println("Got: " + msg + "   FROM: " + session.getLocalAddress());
                            String result = watsonController.analyzeText(msg);
                            session.getRemote().sendString(result);}//sent text
                            catch(Exception e){
                                System.out.println("\n\nSomething almost went wrong..\n\n"+e.getMessage());
                            }
                            break;
            case "image" :  try{
                            String b64 = obj.get("b64").getAsString();
                            //Logger
                            System.out.println("Recieved Image From " + session.getLocalAddress() + "!!! Analyzing.........");
                            JsonObject resultObj = MicrosoftCogHandler.sendPOST(b64);
                            System.out.println("Sent Image to : " + session.getLocalAddress());
                            session.getRemote().sendString(resultObj.toString());}
                            catch(Exception e){
                                System.out.println("\n\nSomething almost went wrong..\n\n");
                            }
                            break;
            default: System.out.println("Error receiving message, PLEASE DEBUG");
        }
    }
}
