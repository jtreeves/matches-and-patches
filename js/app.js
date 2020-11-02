const patches = document.querySelectorAll('.patch')
const smallPatches = document.querySelectorAll('.small-patch')

for (let i = 0; i < patches.length; i++) {
    patches[i].addEventListener('click', function(){patches[i].innerText = 'clicked'})
}

for (let i = 0; i < smallPatches.length; i++) {
    smallPatches[i].addEventListener('click', function(){smallPatches[i].innerText = 'clicked'})
}