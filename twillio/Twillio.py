import sys
print(sys.executable)

from twilio.rest import Client

# Dine Twilio credentials (skift med dine egne)
TWILIO_ACCOUNT_SID = ""  # Indsæt dit Twilio Account SID
TWILIO_AUTH_TOKEN = ""    # Indsæt dit Twilio Auth Token
TWILIO_PHONE_NUMBER = "+test"  # Indsæt dit Twilio-telefonnummer

# Opret en Twilio-klient
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)


list_url="list_url"

def send_sms(to_number, message_body):
    try:
        # Sender SMS via Twilio API
        message = client.messages.create(
            body=message_body,
            from_=TWILIO_PHONE_NUMBER,  # Dit Twilio-telefonnummer
            to=to_number                # Telefonnummeret, som beskeden sendes til
        )
        # Returnér SMS ID
        return message.sid

    except Exception as e:
        print(f"Error sending SMS: {e}")
        return None
    
def read_sms_code(phone_number):
    try:
        # Henter beskeder fra Twilio med filtrering efter telefonnummer
        messages = client.messages.list(from_=phone_number, limit=10)  # Henter de seneste 10 beskeder fra det specifikke nummer

        # Udskriv alle beskeder fundet
        for message in messages:
            print(f"From: {message.from_}, To: {message.to}, Body: {message.body}, Date Sent: {message.date_sent}")

        return messages  # Returnér listen af beskeder
    except Exception as e:
        print(f"Error reading SMS: {e}")
        return None
