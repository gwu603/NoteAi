from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

class text_classification_model:
    _instance = None

    def __init__(self):
        self.model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-small")
        self.tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-small")

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls, *args, **kwargs)
        return cls._instance    
    
    def classify(self, categories, input):
        with open("ml_model/prompt.txt", "r") as file:
            prompt = file.read()
        
        prompt += f"Categories: {categories} \n text: {input} \n Category: "
        tokenized_input = self.tokenizer(prompt, return_tensors="pt")
        outputs = self.model.generate(**tokenized_input)
        return self.tokenizer.batch_decode(outputs, skip_special_tokens=True)