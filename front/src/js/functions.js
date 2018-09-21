'use strict';
import $ from 'jquery'

export default class Functions {
    random(min, max){
        return Math.floor(Math.random() * (max - min)) + min
    }

    showMessage(errorSuccsessClassName, fieldSelector, message){
        $(fieldSelector).parent().prev(`.${errorSuccsessClassName}`).remove()
        $(fieldSelector).parent().before(`<div class="${errorSuccsessClassName}">${message}</div>`)
    }

    messageDelete(errorSuccsessClassName, fieldSelector){
        $(fieldSelector).parent().prev(`.${errorSuccsessClassName}`).remove()
    }

    showModal(modalClassName, containerSelector, message){
        $(containerSelector).append(`<div class="modalOverlay"></div>
                                    <div class="${modalClassName}">${message}</div>`)
    }

    deleteModal(modalClassName){
        $(`.modalOverlay`).remove()
        $(`.${modalClassName}`).remove()
    }

    capsDetection(e, fieldSelector){
        let functions = new Functions,
            character = e.keyCode ? e.keyCode : e.which,
            sftKey = e.shiftKey ? e.shiftKey : ((character == 16) ? true : false),
            isCapsLock = (((character >= 65 && character <= 90) && !sftKey) || ((character >= 97 && character <= 122) && sftKey))

        if (isCapsLock) {
            functions.showMessage('inputError', fieldSelector, 'CAPS LOCK is on!')
        } else{
            functions.messageDelete('inputError', fieldSelector)
        }
    }
}