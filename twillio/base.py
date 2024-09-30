from supabase import create_client, Client
import os

SUPABASE_URL = "supabase_url"
SUPABASE_KEY = "supabase_key"

# Create a Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def save_message_to_db(phone_number, message_body):
    try:
        # Udfør indsættelse af data i Supabase med de korrekte kolonnenavne
        response = supabase.table('Message-table').insert({
            'Phone_number': phone_number,  # Korrekt stavning af Phone_number
            'Message': message_body,       # Korrekt stavning af Message
        }).execute()

        # Udskriv responsen fra Supabase
        print(f"Supabase Response: {response}")

        # Tjek om der er fejl i svaret
        if 'error' in response and response['error']:
            print(f"Error in Supabase response: {response['error']}")
            return None
        
        # Hvis der ikke er fejl, kan vi returnere dataen
        print(f"Supabase Inserted Data: {response['data']}")
        return response['data']

    except Exception as e:
        print(f"An error occurred: {e}")
        raise e


def get_user_messages(phone_number):
    # Henter beskeder for en bestemt bruger
    response = supabase.table('messages').select('*').eq('phone_number', phone_number).execute()
    return response.data

def read_available_numbers():
    try:
        # Fetch available numbers from Supabase
        response = supabase.table('available_numbers').select('*').eq('is_available', True).execute()
        
        if 'error' in response and response['error']:
            print(f"Error fetching available numbers: {response['error']}")
            return []
        
        # Extract phone numbers from the response
        available_numbers = [item['phone_number'] for item in response.data]
        
        return available_numbers

    except Exception as e:
        print(f"An error occurred while fetching available numbers: {e}")
        return []
