from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='marvel', description='Marvel Team')
        dc = Team.objects.create(name='dc', description='DC Team')

        # Create users
        ironman = User.objects.create(name='Iron Man', email='ironman@marvel.com', team='marvel')
        captain = User.objects.create(name='Captain America', email='cap@marvel.com', team='marvel')
        batman = User.objects.create(name='Batman', email='batman@dc.com', team='dc')
        superman = User.objects.create(name='Superman', email='superman@dc.com', team='dc')

        # Create activities
        Activity.objects.create(user=ironman, type='run', duration=30, date='2025-09-04')
        Activity.objects.create(user=captain, type='cycle', duration=45, date='2025-09-04')
        Activity.objects.create(user=batman, type='swim', duration=60, date='2025-09-04')
        Activity.objects.create(user=superman, type='fly', duration=120, date='2025-09-04')

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=75)
        Leaderboard.objects.create(team=dc, points=180)

        # Create workouts
        Workout.objects.create(name='Pushups', description='Do 20 pushups', difficulty='easy')
        Workout.objects.create(name='Sprints', description='Run 5 sprints', difficulty='medium')
        Workout.objects.create(name='Marathon', description='Run a marathon', difficulty='hard')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
