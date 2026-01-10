
from playwright.sync_api import sync_playwright, expect

def test_ai_advisor(page):
    # 1. Go to homepage
    page.goto("http://localhost:4321")

    # 2. Check for button
    button = page.locator("#jc-advisor-btn")
    expect(button).to_be_visible()

    # Check for initials
    initials = button.locator(".jc-initials")
    expect(initials).to_contain_text("JC")

    # Screenshot button
    page.screenshot(path="verification/button.png")

    # 3. Click button to open modal
    button.click()

    # 4. Wait for modal
    modal = page.locator("#progressivoAdvisorModal")
    expect(modal).to_be_visible()

    # Screenshot modal
    page.screenshot(path="verification/modal_open.png")

    # 5. Click outside (on the modal container which is the backdrop)
    # We click on the top left corner of the modal container, assuming it's the backdrop area
    # Or just click position 0,0 relative to modal?
    # The modal container has flex centering, so clicking 10,10 should be safe if modal content is centered.
    modal.click(position={"x": 10, "y": 10})

    # 6. Verify closed
    expect(modal).not_to_be_visible()

    # Screenshot closed
    page.screenshot(path="verification/modal_closed.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_ai_advisor(page)
            print("Verification script finished successfully.")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
