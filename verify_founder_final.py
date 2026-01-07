from playwright.sync_api import sync_playwright

def verify_founder(page):
    # Go to homepage
    page.goto("http://localhost:4321")

    # Locate founder section
    founder_section = page.locator("#founder")

    # Wait for the image wrapper to be present
    image_wrapper = page.locator(".founder-image-wrapper")
    image_wrapper.wait_for()

    # Force the 'visible' class to bypass the IntersectionObserver for the screenshot
    # We want to verify the styling of the 'visible' state (clip-path, no border, etc.)
    page.evaluate("""
        const el = document.querySelector('.founder-image-wrapper');
        el.classList.remove('waiting-for-scroll');
        el.classList.add('visible');
    """)

    # Give a small delay for any transition/animation to complete (though we want end state)
    page.wait_for_timeout(1500)

    # Scroll to view
    founder_section.scroll_into_view_if_needed()

    # Take screenshot of the founder section
    founder_section.screenshot(path="verification/founder_final.png")
    print("Screenshot taken: verification/founder_final.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_founder(page)
        finally:
            browser.close()
