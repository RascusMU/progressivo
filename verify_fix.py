
from playwright.sync_api import sync_playwright
import time

def verify_homepage():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Wait for server to start
            time.sleep(5)

            response = page.goto("http://localhost:4321/")
            print(f"Status: {response.status}")

            # Wait for content to be visible
            page.wait_for_selector("body", state="visible")

            # Take screenshot
            page.screenshot(path="homepage_verification.png")
            print("Screenshot taken")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_homepage()
