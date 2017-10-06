YS-multiple-select v0.01

Multiple Select Plugin for boostrap

## Bootstrap, Jquery Required!

![Alt Text](https://github.com/yyss8/ys-multiple-select/blob/master/demo1.gif?raw=true)

# How to use:
 
  Simply declare ys-multiple-select class in your jquery ready function like:
  
  ![Alt Text](https://github.com/yyss8/ys-multiple-select/blob/master/demo2.png?raw=true)
  
## an unique tag ID is required for each select element!
  
# Methods:
## method name(parameters) :(type)return value
    count (id) : (number)count of selected values
    
    countAll (id) : (number)count of all options
    
    html (id) : (Array) the html content(text) of selected values
    
    value (id) : (Array) selected values
    
    joinBy (id, seperator) (String) the selected values joined by specific seperator
    
    joinHtmlBy(id, seperator) (String) the html content(text) of selected values and joined by specific seperator
