from django.core.mail import EmailMessage
import os

class Utils:

    @staticmethod
    def send_mail(data):
        email = EmailMessage(
            subject = data['subject'],
            body = data['body'],
            from_email=os.environ.get('EMAIL_FROM'),
            # from_email='pande.amul.dcs24@vnsgu.ac.in',
            to=[data['to_email']]
        )
        email.send()
        
    @staticmethod
    def send_approve_email(data):
        email=EmailMessage(
            subject='Approval of Request',
            body='Your request has been approved, Thany you for joining us',
            from_email=os.environ.get('EMAIL_FROM'),
            to=[data]
        )
        email.send()
        
    @staticmethod
    def send_blocked_email(data):
        email=EmailMessage(
            subject='Reject Request',
            body='You have been blocked by us so from now on you wont be able to get new request. You can contact us if thats a mistake.',
            from_email=os.environ.get('EMAIL_FROM'),
            to=[data]
        )
        email.send()