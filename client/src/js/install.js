const butInstall = document.getElementById('buttonInstall');

//  Installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {

    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {

    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // Show prompt
    promptEvent.prompt();
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});
window.addEventListener('appinstalled', (event) => {
    // Clear prompt
    window.deferredPrompt = null;
}); 