from playwright.sync_api import sync_playwright
import time

def verify_service_cards():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Emulate mobile device
        context = browser.new_context(
            viewport={'width': 375, 'height': 667},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1'
        )
        page = context.new_page()

        # Navigate to homepage
        page.goto("http://localhost:3000/")

        # Wait for potential initial load animations (global delay is 2s)
        time.sleep(3)

        # Scroll to services section
        services_section = page.locator(".section-services")
        services_section.scroll_into_view_if_needed()

        # Wait for animation to start/complete (1.5s duration)
        time.sleep(2)

        # Take screenshot of the cards
        page.screenshot(path="verification/service_cards_mobile.png")

        # Verify card exists and is visible
        card = page.locator(".service-card").first
        if card.is_visible():
            print("Service card is visible")

        # Optional: Try to trigger active state and screenshot (tricky in static shot but good for script)
        # Simulate touch/click
        box = card.bounding_box()
        if box:
            page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
            page.mouse.down()
            time.sleep(0.2) # Wait a bit of the 300ms transition
            page.screenshot(path="verification/service_cards_active.png")
            page.mouse.up()

        browser.close()

if __name__ == "__main__":
    verify_service_cards()
