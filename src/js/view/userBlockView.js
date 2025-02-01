import view from "./view";

class UserBlockView extends view {
    _parentElement = null; // ✅ No querySelector here (initialize later)
    username = "";
    currentIcon = "";

    /** ✅ Initialize the view only when needed */
    init() {
        this._parentElement = document.querySelector(".user-block");
        if (!this._parentElement) {
            console.error("⚠️ userBlockView: `.user-block` not found!");
            return;
        }
    }

    /** ✅ Ensure `_parentElement` exists before adding event handlers */
    addIconHandler(handler) {
        if (!this._parentElement) this.init();

        const emojiPicker = document.getElementById("emoji-picker");
        if (emojiPicker) {
            emojiPicker.addEventListener("emoji-click", (event) => {
                console.log("💡 Emoji Selected!");
                this.currentIcon = event.detail.unicode;
                this._parentElement.querySelector("#emoji-button").textContent = this.currentIcon; // Set selected emoji
                handler();
                this._parentElement.querySelector("#emoji-picker").classList.add("hidden"); // Hide picker
            });
        }

        this._parentElement.addEventListener("click", (event) => {
            if (event.target && event.target.id === "emoji-button") {
                this._parentElement.querySelector("#emoji-picker").classList.toggle("hidden");
            }
        });
    }

    addEditHandler(handler) {
        if (!this._parentElement) this.init();

        this._parentElement.addEventListener("click", (event) => {
            if (event.target && event.target.id === "user-edit") {
                handler();
            }
        });
    }

    _generateMarkUp() {
        return `
            <div class="user-block__info">
                <div class="user-icon"></div>
                <div class="user-name">${this.username}</div>
            </div>
            <div class="user-block__icon-choice">
                <button id="emoji-button">${this.currentIcon}</button>
                <emoji-picker id="emoji-picker" class="hidden"></emoji-picker>
            </div>
            <button class="user-edit" id="user-edit">Edit</button>
        `;
    }
}

// ✅ Export an instance that initializes **only when first used**

export default new UserBlockView();
