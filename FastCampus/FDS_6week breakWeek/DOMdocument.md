# DOM 이란?

문서 객체 모델 (The Document Object Moder)로써 HTML, XML 문서의 프로그래밍 인터페이스이다. DOM은 문서의 구조화된 표현을 제공하며 프로그래밍 언어가 DOM구조에 접근할 수 있는 방법을 제공하여 그들이 문서 구조, 스타일, 내용 등을 변경할 수 있게 돕는다 DOM은 구조화된 Nodes와 property와 method를 갖고 있는 object로 문서를 표현한다. 이들은 웹 페이지를 스크립트 또는 프로그래밍 언어들에서 사용될 수 있게 연결시켜주는 역할을 담당한다.

DOM은 프로그래밍 언어는 아니지만 DOM이 없다면 자바스크립트 언어는 웹페이지 또는 XML 페이지 및 요소들과 관련된 모델이나 개념들에 대한 정보를 갖지 못하게 된다. 문서의 모든 element-전체 문서, 헤드, 문서, 안의 table, table header, table cell안의 text- 는 문서를 위한 document object model의 한 부분이다. 때문에, 이러한 요소들을 DOM과 자바스크립트와 같은 스크립팅 언어를 통해 접근하고 조작할 수 있는 것이다.

## 접근하는 방법

스크립트를 작성할 때 (인라인 script요소를 사용하거나 웹페이지 안에 있는 스크립트 로딩 명령을 사용하여), 문서 자체를 조작하거나 문서의 children을 얻기 위해 document 또는 window elements를 위한 API를 즉시 이용할 수 있다. Dom 프로그래밍은 아래처럼 window object 부터 alert()함수를 사용하여 alert message를 표시하는 매우 간단한 것일 수도 있고 다음번 예제처럼 새로운 content를 작성하는 복잡한 Dom이 될  수도 있다.
`<body onload= "window.alert('welcome to my home page!');>

```js
<html>
  <head>
    <script>
       // run this function when the document is loaded
       window.onload = function() {

         // create a couple of elements in an otherwise empty HTML page
         var heading = document.createElement("h1");
         var heading_text = document.createTextNode("Big Head!");
         heading.appendChild(heading_text);
         document.body.appendChild(heading);
      }
    </script>
  </head>
  <body>
  </body>
</html>
```

## 중요한 데이터 타입들

이 문서에서는 nodes는 elements로, 노드의 arrays는 nodeLists(또는, elements), attribute 노드들은 attributes로 표현하였다.

| document | member가 document type의 object를 리턴할 때 (예를 들어 eldemet의 ownerDocument property는 그것이 속해 있는 document를 return한다.),이 object는 rot document object자체이다.|
|---------|--------|
|element | elment는 Dom Api의 member에 의해 return 된 element 또는 element type의 node를  의미한다. document.createElement() method가 node를 참조하는 object를 리턴한다고 말하는 대신, 이 method가 Dom 안에서 생성되는 eldment를 리턴한다고 좀 더 단순하게 말 할수 있다. element 객체들은 Dom element interface와 함께 좀더 기본적인 Node insterface를 구현한 것이기 때문에 이 reference에는 두가지 모두 포함되었따고 생각하면 된다.|
| nodeList | nodeList는 elements의 배열이다. nodeList의 Items은 index를 통해 접근 가능하며, 다음과 같은 두가지 방식이 있다.

* list.item(1)
* list[1]

위의 방식들은 동일한 것이다. item()method는 nodeList object의 단일 method이다. 두번째 방식은 list에서 두번째 item을 fetch 하는 전형적인 array syntax이다. |
| attribute | attribute가 member에 의해 리턴되는 것은(예를 들어 createAttribute() method호출에 의한 리턴), attribute에 대한 특별한 인터페이스를 노출하는 object reference이다. attributes는 DOM에서 element와 같은 nodes이다. elements만큼 많이 사용되지는 않는다. |

## Interfaces 와 Objects

많은 objects가 여러개의 다른 interfaces와 연관되어 있다. 예를 들어, table object는 createCaption, insertRow method들이 포함된 HTML Table Element Interface을 구현 한 것이다. table object는 HTML element이기도 하기 때문에, table은 Element interface도 구현한다. 마지막으로 HTML element는 DOM이 연관되어 있는 한 nodes트리에서 하나의 node이다. nodes트리는 웹페이지 또는 xml 페이지를 위한 object model을 구성한다. 때문에 table element는 보다 기본적인 Element에서 파생된 Node interface를 구현한다.

아래의 예제처럼 table object를 참조하게 되면, 기본적으로 이들 3가지 interfaces를 사용할 수 있게 된다.

```js
var table = document.getElementById("table");
var tableAttrs = table.attributes; // Node/Element interface

for (var i =0; i < tableAttrs.length; i++){
  // HTMLTableElement interface: border attribute
  if(tableAttrs[i].nodeName.toLowerCase() == "border")
  table.border = "1";
}
// HTMlTableElement interface: summary attribute
table.summary - "note: increased border";
```

## DOM의 핵심 Interfaces

여기에서는 이들 API가 실제로 어떤일을 하는 지 설명하는 대신 DOM을 사용하면서 자주 만나게 되는 methods와 properties를 보여줄 것이다.

Document 와 window object는 DOM프로그래밍에서 가장 자주 사용하는 object이다. 간단하게 설명하면 window object는 브라우저와 같다고 할 수 있으며, document object는 root document자체라고 할수 있다. generic Node interface로부터 상속받은 Element와 Node, Element interfaces가 협력하여 각각의 elements에서 사용할 수 있는 수 많은 methods와 properties를 제공한다. 이러한 elements는 이전 섹션에서 설명한 table object 예제에서도 살펴봤듯이, elements가 보유한 데이터를 처리할 수 있는 특졍한 interfaces도 가지고 있다.

* document.getElementById(id)
* document.getElementsByTagName(name)
* document.createElment(name)
* parentNode.appendChild(node)element.innerHTML
* element.style.left
* element.setAttribute
* element.getAttribute
* element.addEventListener
* window.content
* window.onload
* window.dump
* window.scrollTo

## Dom Api 테스팅

```js
<html>
  <head>
    <title>DOM Tests</title>
    <script type="application/javascript">
    function setBodyAttr(attr,value){
      if (document.body) eval('document.body.'+attr+'="'+value+'"');
      else notSupported();
    }
    </script>
  </head> 
  <body>
    <div style="margin: .5in; height: 400;"> 
      <p><b><tt>text</tt>color</b></p> 
      <form>
        <select onChange="setBodyAttr('text',
        this.options[this.selectedIndex].value);"> 
          <option value="black">black 
          <option value="darkblue">darkblue 
        </select>
        <p><b><tt>bgColor</tt></b></p>
        <select onChange="setBodyAttr('bgColor',
        this.options[this.selectedIndex].value);"> 
          <option value="white">white 
          <option value="lightgrey">gray
        </select>
        <p><b><tt>link</tt></b></p> 
        <select onChange="setBodyAttr('link',
        this.options[this.selectedIndex].value);">
          <option value="blue">blue
          <option value="green">green
        </select>  <small>
        <a href="http://www.brownhen.com/dom_api_top.html" id="sample">
        (sample link)</a></small><br>
      </form>
      <form>
        <input type="button" value="version" onclick="ver()" />
      </form>
    </div>
  </body>
</html>
```
