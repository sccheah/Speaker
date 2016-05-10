import static spark.Spark.*;

public class Main {
    public static void main(String[] args) {

        //initialize port
        port(setPort());
        System.out.println("Server Started");
        //socket init
        webSocket("/api/conn", SocketHandler.class);
        init();

        /*
        //rest apis
        post("/watson", (req, res) -> {
            HttpServletRequest request = req.raw();
            String str = req.body();
            System.out.println(str);

            JsonObject obj = new JsonParser().parse(str).getAsJsonObject();
            String img64 = obj.get("b64").getAsString();
            System.out.println(img64);
            JsonObject result = MicrosoftCogHandler.sendPOST(img64);

            return result.toString();
        });
        */

        watsonController.init();
    }

    private static int setPort(){
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567;
    }

}



