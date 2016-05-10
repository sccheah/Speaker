
import com.google.gson.JsonObject;
import com.ibm.watson.developer_cloud.tone_analyzer.v3_beta.ToneAnalyzer;
import com.ibm.watson.developer_cloud.tone_analyzer.v3_beta.model.ToneAnalysis;
import com.ibm.watson.developer_cloud.tone_analyzer.v3_beta.model.ToneCategory;
import com.ibm.watson.developer_cloud.tone_analyzer.v3_beta.model.ToneScore;
import java.util.List;

public class watsonController {

    private static ToneAnalyzer service = new ToneAnalyzer(ToneAnalyzer.VERSION_DATE_2016_02_11);
    private static List<ToneCategory> toneList;
    private static JsonObject obj;

    public static void init(){
        service.setUsernameAndPassword("037bf226-9bb1-493a-8403-6a7009d0efb4","uQX4lQ7bWtWK");
        System.out.println("Connection to Waston Api Established!\n\n");
    }

    public static String analyzeText(String message){
        ToneAnalysis tone = service.getTone(message).execute();
       //populate the list
        toneList = tone.getDocumentTone().getTones();
        obj = getBestEmotion(toneList);
        String result = obj.toString();

        //garbage collection
        toneList.clear();
        obj = null;

        //send the json object
        return result;
    }

    private static JsonObject getBestEmotion(List<ToneCategory> list){
        JsonObject result = new JsonObject();
        result.addProperty("type", "text");
        for(ToneCategory category: list){
            if(category.getId().equals("writing_tone")){
                continue;
            }
            for(ToneScore tone: category.getTones()){
                if(tone.getId().equals("joy")){
                    result.addProperty("joy", tone.getScore());
                    break;
                }
                else if(tone.getId().equals("agreeableness_big5")){
                    result.addProperty("agreeableness", tone.getScore());
                }
            }
        }
        return result;
    }
}
