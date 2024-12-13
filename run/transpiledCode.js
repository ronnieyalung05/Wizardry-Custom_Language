let mana = 10;

function replenish(resource) {
if (resource === 0) {
resource = resource + 10;
} else {
resource = resource - 10;
}
}

let empty = 0;

let spellcast = mana !== empty;