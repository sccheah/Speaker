import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import java.net.URI;


public class MicrosoftCogHandler {

    public static JsonObject sendPOST(String b64) {
        HttpClient httpclient = HttpClients.createDefault();
        String str = "";
        JsonObject obj;
        try
        {
            URIBuilder builder = new URIBuilder("https://api.projectoxford.ai/emotion/v1.0/recognize");


            URI uri = builder.build();
            HttpPost request = new HttpPost(uri);
            request.setHeader("Content-Type", "application/octet-stream");
            request.setHeader("Ocp-Apim-Subscription-Key", "32ce6130ab5d488c8d90abc68e0c8f16");


            request.setEntity(new ByteArrayEntity(Base64.decodeBase64(b64.substring(b64.indexOf(","))+1)));

            HttpResponse response = httpclient.execute(request);
            HttpEntity entity = response.getEntity();
            str = EntityUtils.toString(entity);
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
        }

        obj = parseString(str);

        return obj;
    }

    private static JsonObject parseString(String str){
        JsonObject result = new JsonObject();
        result.addProperty("type", "image");

        JsonArray parsedarr = new JsonParser().parse(str).getAsJsonArray();

        for(JsonElement el: parsedarr){
            JsonObject obj = el.getAsJsonObject().get("scores").getAsJsonObject();
            result.addProperty("happiness", obj.get("happiness").getAsDouble());
            result.addProperty("neutral", obj.get("neutral").getAsDouble());
        }
        return result;
    }

}



