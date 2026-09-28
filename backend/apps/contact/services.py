from .models import ContactMessage


def create_contact_message(*, name: str, email: str, subject: str, message: str) -> ContactMessage:
    return ContactMessage.objects.create(name=name, email=email, subject=subject, message=message)
