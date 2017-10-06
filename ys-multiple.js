class ysMultiSelect{
    
    constructor(selector,args = {}){
        this._args = args;
        this._selector = selector;
        this.multiSelects = {};
        this.build();
    }

    build(){

        var ys = this;
        jQuery(this._selector).each(function(){
            var selectElement = jQuery(this);
            selectElement.hide();
            var id = selectElement.attr("id");
            id = typeof id !== typeof undefined ? id:selectElement.attr("name");
            var div = jQuery(`<div class="ys-multiple"></div>`);
            ys.multiSelects[id] = {
                element:selectElement,
                options:selectElement.children("option")
            }
            var input = ys._buildInput(id);
            div.append(input).append(ys._buildList(id)).insertBefore(selectElement);
            ys.multiSelects[id]["input"] = input;
        });
    }

    count(id){
        return this.multiSelects[id] !== undefined ? this.multiSelects[id].input.val().split(",").length:0;
    }

    countAll(id){
        return this.multiSelects[id].options.length;
    }


    html(id){
        return this.multiSelects[id] !== undefined ? this.multiSelects[id].input.val().split(","):[];
    }

    value(id){
        var value = this.multiSelects[id] === undefined ? []:this.multiSelects[id].element.val();
        return value === null ? []:value;
    }

    setValue(id,value){
        var isValueExists = this.multiSelects[id] !== undefined ? true:false;
        return isValueExists ? this.multiSelects[id].element.val(value):false;
    }

    joinBy(id,seperator){
        return this.value(id).join(seperator);
    }

    joinHtmlBy(id,seperator){
        return this.html(id) ? this.html(id).join(seperator):"";
    }

    _buildInput(id){
        var values = this.multiSelects[id].element.children("option[selected]").map(function(){
            return this.innerHTML;
        }).get().join(",");
        var input = jQuery(`<input class="form-control ys-multiple-input" forSelector="${id}" readonly value="${values}">`);
        input.bind("focus", this._inputOnFocus);
        return input;
    }

    _buildList(id){

        var ul = jQuery(`<ul class="ys-multiple-ul" forSelector="${id}"></ul>`); 
        var ys = this;
        ys.multiSelects[id].options.each(function(){
            var option = jQuery(this);
            var li = jQuery(`<li class="ys-multiple-li ${option.attr("selected") ? "active":""}" select-value="${option.val()}"></li>`);
            var toRight = option.attr("to-right");
            li.append(`
                <div class="left">${option.html()}</div>
                ${typeof toRight !== typeof undefined && toRight !== false ? `<div class="right">${toRight}<i class="fa fa-check-square-o"></i></div>`:""}
            `);
            li.click(ys._liOnClick(id));
            ul.append(li);
        });

        jQuery(document.body).click(function(e) {
            var ele = jQuery(e.target);
            if (!ele.hasClass("ys-multiple-input")){
                jQuery(ul).slideUp("fast");
            }
        });

        jQuery(ul).click(function(e){
            e.stopPropagation();
        });

        return ul;
    }

    _inputOnFocus(){
        var ele = jQuery(this);
        ele.next().slideDown("fast");
    }


    _liOnClick(id){
        return function(){
            var li = jQuery(this);
            var input = jQuery(`input[forSelector='${id}']`);
            var selector = jQuery(`#${id}`);
            var value = li.attr("select-value");
            var text = li.find(".left").html();
            var inputValues = input.val() === "" ? []:input.val().split(",");
            var selectValues = selector.val() === null ? []:selector.val();
            if (inputValues.indexOf(text) === -1){
                selectValues.push(value);
                inputValues.push(text);
                input.val(inputValues.join(","));
                selector.val(selectValues);
                li.addClass("active");
            }else{
                input.val(inputValues.filter(v => v !== text).join(","));
                selector.val(selectValues.filter(v => v !== value));
                li.removeClass("active");
            }
        }
    }
}
