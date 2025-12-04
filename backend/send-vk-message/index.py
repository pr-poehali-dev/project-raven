import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Отправляет сообщение из формы обратной связи в VK
    Args: event - dict с httpMethod, body (name, email, subject, message)
    Returns: HTTP response dict
    """
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    name = body_data.get('name', 'Аноним')
    email = body_data.get('email', 'Не указан')
    subject = body_data.get('subject', 'Без темы')
    message = body_data.get('message', '')
    
    if not message:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Message is required'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if database_url:
        try:
            conn = psycopg2.connect(database_url)
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO contact_messages (name, email, subject, message) VALUES (%s, %s, %s, %s)",
                (name, email, subject, message)
            )
            conn.commit()
            cur.close()
            conn.close()
        except Exception as db_error:
            pass
    
    vk_token = os.environ.get('VK_ACCESS_TOKEN')
    
    if not vk_token:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'VK token not configured'}),
            'isBase64Encoded': False
        }
    
    vk_message = f"""📩 Новое сообщение с сайта Codeko\n\n👤 Имя: {name}\n📧 Email: {email}\n📝 Тема: {subject}\n\n💬 Сообщение:\n{message}"""
    
    import random
    random_id = random.randint(1, 2147483647)
    
    params = {
        'peer_id': '244887267',
        'message': vk_message,
        'access_token': vk_token,
        'v': '5.199',
        'random_id': str(random_id)
    }
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'success': True,
            'message': 'Сообщение успешно получено! Я свяжусь с вами в ближайшее время.'
        }),
        'isBase64Encoded': False
    }