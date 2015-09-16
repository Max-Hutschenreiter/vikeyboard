
var caretPos = 0;

function initCharInput(id, keys){
    var inputField = $('#' +  id);

    inputField.parent().append('<div id="keyInput'+id+'" class="keyInput keyInput'+id+'"></div>');

    var keyInput = $('#keyInput'+id);

    keyInput.html('<div id="keyInputClose'+id+'" class="keyInputClose keyInputClose'+id+'" onclick="$(\'#keyInput'+id+'\').hide();">X</div>');

    inputField.focus(function() {
        $('.keyInput').hide();
        keyInput.show();
        keyInput.css('top', inputField.position().top + inputField.outerHeight() + 5);
        keyInput.css('left', inputField.position().left);
        keyInput.css('max-width', inputField.outerWidth());

        var keyInputClose = $('#keyInputClose'+id);
        keyInputClose.css('top',  3);
        keyInputClose.css('right', -(keyInputClose.height() * 1.5) );
    });



    inputField.blur(function(){
        caretPos = getCaretPos(document.getElementById(this.id));
    });


    for(var i = 0; i < keys.length; i++){
        keyInput.html(keyInput.html() + createLetterButton(id, keys[i]));
    }

    $('.letterInput'+id).width(inputField.height());
    $('.letterInput'+id).height(inputField.height());
    $('.letterInput'+id).css('font-size', inputField.css('font-size'));
    $('.keyInputClose'+id).width(inputField.height());
    $('.keyInputClose'+id).height(inputField.height());
    $('.keyInputClose'+id).css('font-size', inputField.css('font-size'));
}

function addLetterToInput(id, letter){
    var inputField = $('#' + id);

    var string = inputField.val();

    inputField.val([string.slice(0, caretPos), letter, string.slice(caretPos)].join(''));

    inputField.focus();

    setCaretPos(document.getElementById(id), (caretPos + letter.length));
}

function createLetterButton(id, letter){
    var answer = '<div class="letterInput letterInput'+id+'" onclick="addLetterToInput(\''+id+'\', \''+letter+'\')">' + letter + '</div>';
    return answer;
}

function getCaretPos(domElem) {
    var pos;

    if (document.selection) {
        domElem.focus();
        var sel = document.selection.createRange();
        sel.moveStart('character', - domElem.value.length);
        pos = sel.text.length;
    }
    else if (domElem.selectionStart || domElem.selectionStart == '0') {
        pos = domElem.selectionStart;
    }
    return pos;
}

function setCaretPos(domElem, pos) {
    if(domElem.setSelectionRange) {
        domElem.focus();
        domElem.setSelectionRange(pos, pos);
    }
    else if (domElem.createTextRange) {
        var range = domElem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}