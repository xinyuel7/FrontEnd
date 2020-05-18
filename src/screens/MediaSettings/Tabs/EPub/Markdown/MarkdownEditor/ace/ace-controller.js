import _ from 'lodash';

function focus(ace) {
    ace.textInput.focus();
}

function getSelectionRange(ace) {
    let { selection } = ace;

    let lead = selection.lead;
    let anchor = selection.anchor;

    let frontAnchor = lead.row > anchor.row
                    ? anchor
                    : lead.row < anchor.row
                    ? lead
                    : lead.column > anchor.column
                    ? anchor
                    : lead;
    let endAnchor = frontAnchor === lead ? anchor : lead;

    return { endAnchor, frontAnchor };
}

function setLineStartText(ace, text) {
    let row = ace.selection.cursor.row;
    ace.session.insert({ row, column: 0 }, text + ' ');
}

function setOuterText(ace, before='', after) {
    if (!after) after = before;

    let { session, selection } = ace;

    let selectedText = ace.getSelectedText();
    if (!selectedText) {
        selection.selectWord();
    }

    let lead = selection.lead;
    let anchor = selection.anchor;
    let cursor = selection.cursor;

    let { endAnchor, frontAnchor } = getSelectionRange(ace);

    selectedText = _.trim(ace.getSelectedText());
    if (!selectedText) {
        frontAnchor = cursor;
        endAnchor = cursor;
    }

    session.insert({ row: frontAnchor.row, column: frontAnchor.column }, before);
    session.insert({ row: endAnchor.row, column: endAnchor.column }, after);

    let endTextLen = after.length;
    if (frontAnchor.row === endAnchor.row && frontAnchor.column === endAnchor.column) {
        cursor.setPosition(cursor.row, cursor.column - endTextLen);
        lead.setPosition(cursor.row, cursor.column);
        anchor.setPosition(cursor.row, cursor.column);
    } else {
        endAnchor.setPosition(endAnchor.row, endAnchor.column - endTextLen);
        // cursor.setPosition(endAnchor.row, endAnchor.column);
    }
}

export function addHeaderText(ace) {
    setLineStartText(ace, '####');
    focus(ace);
}

export function addBoldText(ace) {
    setOuterText(ace, '**');
    focus(ace);
}

export function addItalicText(ace) {
    setOuterText(ace, '_');
    focus(ace);
}

export function insertQuote(ace) {
    setLineStartText(ace, '>');
    focus(ace);
}

export function insertCode(ace) {
    setOuterText(ace, '`');
    focus(ace);
}

export function addBulletedList(ace) {
    setLineStartText(ace, '-');
    focus(ace);
}

export function addNumberedList(ace) {
    setLineStartText(ace, '1.');
    focus(ace);
}

export function insertLink(ace) {
    setOuterText(ace, '[', '](url)');
    focus(ace);
}

export function insertImgae(ace, image) {
    let { selection, session } = ace;
    let { cursor, doc, anchor } = selection;
    let pos = {
        row: cursor.row + 1,
        column: 0
    };
    doc.insertNewLine(pos);

    session.insert(pos, `![Image Alt](${image})`);

    pos.row += 1;
    doc.insertNewLine(pos);

    anchor.setPosition(pos.row - 1, 2);
    cursor.setPosition(pos.row - 1, 11);

    console.log(doc.insertNewLine, image);

    focus(ace);
}
