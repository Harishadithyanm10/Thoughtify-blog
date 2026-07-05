"""
Generates backend/seed/thoughtify_seed_data.xlsx — 50 fake users and 120 fake posts,
with real hotlinkable placeholder image URLs, ready to load into Supabase with
seed_from_excel.py.

Run:
    python seed/generate_sample_excel.py

Image URLs used (no signup / API key needed):
    - Avatars: https://i.pravatar.cc/300?img=N        (N = 1-70, real fake face photos)
    - Post banners: https://picsum.photos/seed/<seed>/1000/500
      (deterministic — the same seed string always returns the same image,
       and any seed string works, so we can generate as many unique banners
       as we want without worrying about invalid photo IDs)

Change NUM_USERS / NUM_POSTS below to generate more or fewer rows.
"""
import random

import openpyxl

random.seed(42)  # remove this line if you want different fake data every run

NUM_USERS = 50
NUM_POSTS = 120

FIRST_NAMES = [
    "Aria", "Leo", "Nina", "Sam", "Maya", "Kabir", "Zara", "Ravi", "Ishaan", "Diya",
    "Arjun", "Priya", "Vikram", "Anika", "Rohan", "Meera", "Aditya", "Tara", "Nikhil", "Sana",
    "Kunal", "Riya", "Varun", "Ishita", "Dev", "Neha", "Aman", "Pooja", "Rahul", "Simran",
    "Karan", "Anjali", "Yash", "Kavya", "Siddharth", "Alia", "Manav", "Radhika", "Vivaan", "Trisha",
    "Aryan", "Naina", "Harsh", "Divya", "Krish", "Sneha", "Om", "Kritika", "Aayush", "Palak",
]

LAST_NAMES = [
    "Kapoor", "Fernandes", "Rao", "Verma", "Sharma", "Mehta", "Gupta", "Nair", "Iyer", "Chopra",
    "Bose", "Malhotra", "Reddy", "Kulkarni", "Joshi", "Bhatt", "Desai", "Singh", "Pillai", "Chatterjee",
]

CITIES = [
    "Mumbai", "Bengaluru", "Chennai", "Delhi", "Hyderabad", "Pune", "Kolkata",
    "Ahmedabad", "Jaipur", "Kochi", "Chandigarh", "Goa",
]

CATEGORIES = ["Personal", "Lifestyle", "Travel", "Health", "Business", "Technology", "Food", "Culture"]

TITLE_TEMPLATES = [
    "Finding Calm in a {adj} World",
    "Why I Stopped Chasing {noun}",
    "Notes on {adj} {noun}",
    "A Beginner's Honest Guide to {noun}",
    "What Nobody Tells You About {noun}",
    "Small Rituals That Made My {noun} {adj}",
    "The {noun} Map I Wish I Had on Day One",
    "On {noun} Badly First",
    "Three Cities, Three Kinds of {noun}",
    "Letters to My {adj} Self",
    "How {noun} Changed the Way I See {noun2}",
    "{number} Lessons From a Year of {noun}",
    "The Quiet Case for {adj} {noun}",
    "Rebuilding My {noun} From Scratch",
    "A Slow Guide to {adj} Living",
]

ADJECTIVES = ["Loud", "Quiet", "Busy", "Simple", "Honest", "Messy", "Slow", "Restless", "Ordinary", "Unfinished"]
NOUNS = [
    "Mornings", "Journaling", "Travel", "Productivity", "Friendship", "Work", "Solitude",
    "Cooking", "Money", "Habits", "Creativity", "Rest", "Focus", "Change", "Home",
]
NOUNS2 = ["Time", "Success", "Relationships", "Myself", "Career", "Happiness"]

CONTENT_OPENERS = [
    "Some mornings the noise outside matches the noise inside.",
    "I didn't expect this to change how I think about my own routine.",
    "It started as a small experiment and turned into a habit I didn't want to break.",
    "Every app and article promised an answer. None of them fixed the real question.",
    "This isn't a listicle — just an honest account of what actually worked, and what didn't.",
    "A year ago I would have rolled my eyes at this advice. Now I live by it.",
]
CONTENT_MIDDLES = [
    "Here's how I've learned to sit with both without needing to fix either right away.",
    "The first draft is allowed to be bad, and giving myself that permission changed everything.",
    "I tried five different approaches so you don't have to guess which one sticks.",
    "It's not the big overhaul that helped — it was three tiny, boring habits repeated daily.",
    "The hardest part wasn't starting. It was staying curious after the novelty wore off.",
    "What surprised me most was how much of this was about attention, not effort.",
]
CONTENT_CLOSERS = [
    "Slowing down isn't the same as giving up — it took me a while to believe that.",
    "If you're in the middle of figuring this out too, I hope this helps even a little.",
    "I still don't have it all figured out, but I'm glad I started anyway.",
    "The goal was never perfection. It was just showing up a little more honestly.",
]


def make_users(n):
    users = []
    used_usernames = set()
    for i in range(n):
        first = random.choice(FIRST_NAMES)
        last = random.choice(LAST_NAMES)
        base_username = f"{first.lower()}_{last.lower()}"
        username = base_username
        suffix = 1
        while username in used_usernames:
            suffix += 1
            username = f"{base_username}{suffix}"
        used_usernames.add(username)

        email = f"{username}@example.com"
        avatar_img = (i % 70) + 1  # pravatar has images 1-70
        users.append((
            username,
            email,
            "Password123",
            first,
            last,
            f"https://i.pravatar.cc/300?img={avatar_img}",
            f"9{random.randint(100000000, 999999999)}",
            f"{random.randint(1985, 2005)}-{random.randint(1,12):02d}-{random.randint(1,28):02d}",
            f"{random.choice(CITIES)}, India",
        ))
    return users


def make_title(index):
    template = random.choice(TITLE_TEMPLATES)
    title = template.format(
        adj=random.choice(ADJECTIVES),
        noun=random.choice(NOUNS),
        noun2=random.choice(NOUNS2),
        number=random.choice(["Five", "Seven", "Ten", "Three"]),
    )
    # Guarantee uniqueness across the sheet even if two templates collide
    return f"{title} ({index})" if index > 0 else title


def make_content():
    return " ".join([
        random.choice(CONTENT_OPENERS),
        random.choice(CONTENT_MIDDLES),
        random.choice(CONTENT_MIDDLES),
        random.choice(CONTENT_CLOSERS),
    ])


def make_posts(n, usernames):
    posts = []
    seen_titles = set()
    for i in range(n):
        title = make_title(0)
        # de-duplicate by appending an index only when needed, keeps titles cleaner
        base_title = title
        dedup_index = 0
        while title in seen_titles:
            dedup_index += 1
            title = f"{base_title} ({dedup_index})"
        seen_titles.add(title)

        posts.append((
            title,
            make_content(),
            random.choice(CATEGORIES),
            f"https://picsum.photos/seed/thoughtify{i}/1000/500",
            random.choice(usernames),
            random.choices(["publish", "draft"], weights=[85, 15])[0],
            random.choices(["recent", "popular", "trending"], weights=[50, 25, 25])[0],
            i == 0,  # only the very first post is the homepage hero
        ))
    return posts


def main():
    users = make_users(NUM_USERS)
    usernames = [u[0] for u in users]
    posts = make_posts(NUM_POSTS, usernames)

    wb = openpyxl.Workbook()

    users_ws = wb.active
    users_ws.title = "users"
    users_ws.append(
        ["username", "email", "password", "first_name", "last_name",
         "avatar_url", "phone", "dob", "address"]
    )
    for row in users:
        users_ws.append(row)

    posts_ws = wb.create_sheet("posts")
    posts_ws.append(
        ["title", "content", "category", "image_url", "author_username",
         "status", "section", "main_post"]
    )
    for row in posts:
        posts_ws.append(row)

    out_path = "seed/thoughtify_seed_data.xlsx"
    wb.save(out_path)
    print(f"Wrote {len(users)} users and {len(posts)} posts to {out_path}")
    print("Edit it if you like, then run: python seed/seed_from_excel.py")


if __name__ == "__main__":
    main()