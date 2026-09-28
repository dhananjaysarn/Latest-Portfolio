from django.test import TestCase

from .models import StartupIdea


class StartupIdeaModelTests(TestCase):
    def test_stage_is_explicitly_a_concept(self):
        idea = StartupIdea.objects.create(name="Study planner", summary="A planning concept.")
        self.assertEqual(idea.stage, StartupIdea.Stage.CONCEPT)
