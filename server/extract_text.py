import PyPDF2
import sys
import json

def extract_text_from_pdf(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ''
            for page in reader.pages:
                text += page.extract_text() or ''
            
            # Convert extracted text to JSON format
            return json.dumps({'text': text})
    except Exception as e:
        return json.dumps({'error': str(e)})

if __name__ == '__main__':
    pdf_path = sys.argv[1]
    extracted_text = extract_text_from_pdf(pdf_path)
    print(extracted_text)
