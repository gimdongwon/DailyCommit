# React 방식으로 생각하기.

React 에는 여러 멋진 면이 있는데, 그중 하나는 앱을 만드느 과정을 거치는 동안에 독자가 특별한 사고방식을 갖도록 만든다는 것이다. 이 문서에서는 React 를 사용하여 검색 가능한 상품 데이터 표를 만들 때 어떠한 생각 흐름으로 진행되는지 알아보자

## 가짜 데이터로 시작하기

우리가 이미 JSON API 와 디자이너와 디자인이 이미 주어졌다고 상상해 보자

우리는 JSON API 는 다음과 같은 데이터를 변환한다.

```json
[]
  {category: "Sporting aGoods", price: "$49.99", stocked:true, name:"Football"},
  {category: "Sporting aGoods", price: "$9.99", stocked:true, name: "Baseball"},
  {category: "Sporting aGoods", price: "49.99", stocked:false, name:"Basketball"},
  {category: "Electrocics", price: "99.99", stocked:true, name:"iPod Touch"},
  {category: "Electrocics", price: "399.99", stocked:false, name:"iPod Touch"},
  {category: "Electrocics", price: "199.99", stocked:true, name:"iPod Touch"}
]
```

### 1 단계 : UI 를 컴포넌트 계층으로 분리하기

우리가 가장 먼저해야할 시안을 보고 각 컴포넌트에 박스를 그리고 이름을 지어주는 것이다. 만약 디자이너와 함께 일하고 있다면, 이 작업을 디자이너 분이 이미 했을 수도 있다.

하지만, 어떤 것들을 컴포넌트로 만들어주어야 할지 어떻게 알수 있을까 그냥 당신이 새 함수나 객체를 만들지 말지 결정을 할 때 사용하는 기준을 그대로 적용해라. 그 기준중 하나는 single responsibility principle (단일책임원칙)이다. 즉 컴포넌트가 한 가지의 작업만 하도록 만드는 것이 이상적이다. 컴포넌트가 책임지는 작업이 늘어난다면, 이는 더 작은 서브 컴포넌트들로 분리되어야 한다.

당신에게는 JSON 데이터 모델을 보여주게 된다. 마약에 모델이 제대로 만들어져있다면, UI 도 잘 매핑 될 것이다.
그 이유는 UI 와 데이터 모델은 보통 정보구조와 와 서로 깊게 연관이 되어있기 때문이다. 그렇기 때문에, 이 UI 를 컴포넌트로 세부화시키는 것은 대부분 그렇게 대단한 일은 아니다. 그냥 각 컴포넌트가 데이터 모델의 한 조각을 나타내도록 분리시켜라.

여기서 우리의 간단한 앱에서 사용할 다섯개의 컴포넌트를 보게 될 것이다. 각 컴포넌트가 나타내는 데이터를
이탤릭체로 표기했다.

![JSON 데이터 모델](http://reactjs-org-ko.netlify.com/static/thinking-in-react-components-eb8bda25806a89ebdc838813bdfa3601-82965.png)

1.  FilterableProductTable(오렌지색): 예제 전부를 포함하는 컴포넌트
2.  SearchBar (파랑색): 모든 사용자 입력을 받는 컴포넌트
3.  ProductTable(초록색): 사용자 입력으로부터 생성된 데이터 모음을 표시하고, 필터링한는 컴포넌트
4.  ProductCategoryRow(청록색): 각 category 의 제목을 표시하는 컴포넌트
5.  ProductRow(빨강색): 각 product 에 대한 행을 표시하는 컴포넌트

ProductTable 를 보면, "Name"과 "Price"를 포함하고 있는 테이블 제목 부분을 표시하기 위한 별도의 컴포넌트가 없다는 사실을 확일할 수 있다. 이것은 선호의 문제이며, 어느 쪽을 선택할 지는 경우에 따라 다르다. 이 예제에서는, 제목을 ProductTable 의 일부로 남겨두었는데 이 작업이 데이터 모음을 렌더링하는 ProductTable 의 책임의 일부이기도 하다. 다만, 제목 부분이 복잡해 지는 경우에는 제목을 위한 ProductTableHeader 컴포넌트를 만드는 것이 더 합리적인 선택이라고 할수 있다.

우리가 시안에서 컴포넌트를 이끌어 냈으니, 이제 이것들을 계층 구조로 만들어 보자. 우리의 시안에서 다른 컴포넌트의 내부에 표시도는 컴포넌트는 아래 계층 구조에서 자식으로 표현되고 있다.

- FilterableProductTable
  - SearchBar
  - ProductTable
    - ProductCategoryRow
    - ProductRow

## 2 단계: React 를 이용해 정식버전 만들기

이제 컴포넌트 계층 구조가 만들어졌으니, 앱을 실제로 구현해볼 시간이다. 가장 쉬운 방법은 데이터 모델을 가지고 UI 를 렌더링하긴 하지만 상호작용은 전혀 없는 버전을 만들어 보는 것이다. 이렇게 과정을 나누는 것이 좋은데, 정적 버전을 만드는 직업은 많은 타이핑을 필요로 하지만 큰 고민 없이 만들 수 있고, 상호 작용을 만드는 작업은 많은 생각을 필요로 하지만 타이핑에 드는 수고가 크기 때문이다.

위의 데이터 모델을 렌더링하는 앱의 정적 버전을 만들기 위해서, 다른 컴포넌트를 재사용하는 컴포넌트를 만들고 props 를 이용해 데이터를 넘겨주는 것이 좋다. props 는 부모가 자식에게 데이터를 넘겨줄 때 쓸수 있는 한가지 방법이다. 만약 state 에 대해 알다면 정적 버전을 만들 때는 state 를 일절 사용하지 말아야 한다. state 는 오직 상호작용을 위해서, 다시말해 시간이 흐르면서 변하는 데이터를 위해서만 사용하도록 남겨주어야 한다. 지금 만드는 것은 정적 버전이므로 state 가 필요없다.

앱을 만들 때, 하향싱, 혹은 상향식 으로 만들 수 있다. 다시 말해, 계층 구조의 상층부에 있는 컴포넌트로 부터 시작할 수도 있고 하층부에 있는 컴포넌트부터 시작할 수도 있다. 간단한 예제 같은 경우는 대개 하향식으로 만드는 것이 쉽지만 큰 프로젝트의 경우는 상향식으로 만들면서 만든 것을 바로 테스트하는 식으로 개발을 하는 것이 더 쉽다.

이 단계를 마치면 여러분은 데이터 렌더링을 위해 만들어진, 재사용 가능한 컴포넌트들의 라이브러리를 갖게 될 것이다. 이 컴포넌트들은 오로지 render() 메소드만을 갖게 될 것인데, 이는 지금 울리가 만드는 것이 앱의 정적 버전이기 때문이다. 계층 구조의 최상단에 있는 컴포넌트는 데이터 모델을 prop 으로 받게 될 것이다. 데이터 모델에 변경을 가한뒤 ReactDOM.render()을 다시 호출하면, UI 가 갱신될 것이다. 어느 곳을 고쳐서 어떻게 UI 가 갱신되는 지 확인하는 일은 어렵지 않은데, 현재 로써는 크게 복잡한 부분이 없기 때문이다. React 의 단방향 데이터 흐름은 앱을 모듈화하기 좋게, 또 빠르게 동작하게 만들어준다.

## 3 단계: UI 상태에 대한 최소한의 (그러나 완전한) 표현 찾아내기

UI 를 상호작용 가능하게 만들려면, 기반 데이터 모델에 변경을 가할 수 있는 방법이 있어야 한다. 이때 state 를 사용하면 된다.

앱을 올바르게 만들기 위해서는, 먼저 앱이 필요로 하는 최소한의 "변경 가능한 상태"를 고민해야 할 필요가 있다. 여기서 유념해야 할 것은 DRY(Don't Repeat Yourself)이다. 여러분의 어플리케이션이 필요로하는 상태를 완전한 형태로, 그러나 가장 작은 형태로 표현할 방법을 찾아내고, 다른 모든 것들을 필요할 때 상태로부터 계산하자. 예를 들어, 여러분이 할일 리스트를 만든다고하면, 할일 항목을 저장하는 배열만 유지하고, 할일 갯수를 저장하는 상태를 별도로 두지 않는것이 좋다. 할일 갯수를 렌더링할 필요가 생기면, 그냥 할일 배열의 길이를 가져다 쓰면 된다.

우리의 예제 어플리케이션에서 필요로 하는 모든 데이터를 생각해 보면 다음과 같다.

- 제품 목록의 원본
- 사용자가 입력한 검색 텍스트
- 체크박스의 체크여부
- 필터링 된 제품 목록

각각을 살펴보고 어떤 것이 state 가 되어야 할지 결정해 보자. 일단 각각의 데이터에 대해 아래 세가지 질문에 답해보자

1.  부모가 prop 을 통해 넘겨주는 데이터 인가? 만약 그러다면, 그것은 state 가 아니다.
2.  시간이 지나도 변하지 않는가? 그렇다면 state 가 아니다.
3.  컴포넌트 내의 다른 state 나 prop 으로부터 계산될 수 있는 것인가? 그렇다면 state 가 아니다

제품 목록의 원본은 prop 을 통해 넘어오키 때문에, state 가 아니다. 검색 텍스트와 체크박스는 state 로 볼 수 있는데, 이것들이 시간이 지남에 따라 변하기도 하고 또 다른 것들로부터 계산 될 수 있는 값이 아니기 때문이다. 마지막으로 필터링 된 제품 목록은 state 가 아닌데, 제품 목록의 원본과 검색 텍스트, 체크박스의 값을 조합해서 계산해낼 수 있기 때문이다.

결국 우리의 state 는 다음과 같다.

- 사용자가 입력한 검색 텍스트
- 체크박스의 체크여부

## 4 단계: 상태가 어디에 있어야 할 지 결정하기

우리는 앱의 상태에 대한 최소한의 표현을 찾아냈다. 다음으로는 어떤 컴포넌트가 상태를 변경, 혹은 소유할 지를 결정해야 한다.

기억해라: React 는 항상 컴포넌트 계층 구조를 통해 밑으로 내려가는 단방향 데이터 흐름을 따른다 어떤 컴포넌트가 어떤 상태를 가져야 하는지 바로 결정하기 어려울 수 있는데, 많은 초보자들이 이 부분을 가장 이해하기 어려워한다.

여러분의 어플리케이션이 가지는 각각의 상태에 대해서:

- 상태에 기반해 렌더링을하는 모든 컴포넌트를 찾아내시오
- 공통 소유자 컴포넌트를 찾아라.(계층 구조 내에서 특정 상태를 필요로 하는 모든 다른 컴포넌트들의 위에 있는 하나의 컴포넌트)
- 공통 소유자 혹은 더 위에 있는 컴포넌트가 상태를 가져야 한다.
- 상태를 소유할 적절한 컴포넌트를 찾지 못했다면, 단순히 상태를 소유하는 컴포넌트를 하나 만들어서 공통 소유자 컴포넌트의 상층부에 그것을 추가해라

이 전략을 우리의 어플리케이션에 적용해 보면

- ProductTable 는 상태에 기반해 제품 목록을 필터링해야 하고 SearchBar 는 검색 텍스트와 체크박스의 상태를 표시해주어야한다.
- 공통 소유자 컴포넌트는 FilterableProductTable 이다
- 의미상으로도 FilterableProductTable 이 검색 텍스트와 체크박스의 체크 여부를 갖는것이 타당하다.

이제 우리는 상태를 FilterableProductTable 내부에 두기로 결정했다. 먼저, FilterableProductTable 의 constructor 메소드에 this.state = {filterText: '', inStockOnly: false}와 같이 인스턴스 속성을 추가해서 어플리케이션의 초기 상태를 반영하도록 하자. 그리고 나서 ProductTable 과 SearchBar 에 filterText 와 inStockOnly 를 prop 으로 넘겨주자. 마지막으로, 이 prop 들을 사용해 ProductTable 의 행을 필터링하고 SearchBar 의 입력 필드의 값을 지정하자.

이제 여러분의 어플리케이션이 어떻게 동작하는지 확인해 볼 수 있다. filterText 를 "ball"로 설정하고 앱을 새로고침 해보자 데이터 표 표가 잘 갱신된 것을 확인할 수 있다

## 5 단계: 역방향 데이터 흐름 추가하기

```js
class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
VIEW COMPILED
```

이제까지 우리는 계층 구조의 아래로 흐르는 prop 과 state 에 대한 함수로서의 앱을 만들었다. 이제 다른 방향으로의 데이터 흐름을 만들어 볼 시간이다. 계층 구조의 깊숙한 곳에 있는 폼 컴포넌트에서 FilterableProductTable 의 state 를 갱신할 수 있어야 한다.

React 는 이러한 데이터 흐름을 명시적으로 보이게끔 만들어서 프로글매이 어떻게 동작하는지를 쉽게 파악할 수 있도록 해주지만, 전통적인 양방향 데이터 흐름과 비교했을 때 조금 더 많은 타이핑을 필요로 한다.

지금 버전의 예제에서 타이핑을 하거나 체크박스에 체크를 하려고 하면, React 가 사용자의 입력을 무시하는 경우를 확인할 수 있다.이는 의도적 경우인데 FilterableProductTable 에서 넘어온 state 가 input 의 value prop 과 언제나 같기 때문이다.

우리가 어떤 일이 일어나기를 바라는 것인지 생각해 보자 우리는 사용자가 폼을 변경할 때마다, 사용자의 입력을 반영하도록 state 를 갱신하기를 원한다. 컴포넌트는 그 자신의 state 만 변경할 수 있기 때문에, FilterableProductTable 는 SearchBar 에 콜백을 넘겨서 state 가 갱신되어야 할 때마다 호출되도록 할것이다. 우리는 입력 필드에 onChange 이벤트를 사용해서 알림을 받을수 있다.
FilterableProductTable 에 의해 넘겨진 콜백은 setState()을 호출할 것이고, 그에 따라 앱이 갱신될 것이다.

복잡하게 들리지만, 이것은 정말 단지 몇 줄의 코드에 불과하다 그리고 앱 전체적으로 데이터가 흘러나니는 모습을 매우 명시적으로 볼수 있다.

### 이게 전부

이 글을 통해 React 를 가지고 컴포넌트와 어플리케이션을 만드는 데 대한 사고방식을 얻어갈 수 있기를 바란다. 이 방식은 이제까지 해왔던 것보다 조금 더 많은 타이핑을 필요로 할수 있지만 코드를 쓸 일보다 읽을 일이 훨씬 더 많다는 사실을 기억해라. 모듈화되고 명시적인 코드는 정말 읽기가 쉽다. 큰 컴포넌트 라이브러리를 만들게 된다면, 이 명시성과 모듈성에 고마워할 것이다. 또한 코드 재사용을 통해 코드의 양이 줄어들기 시작할 것이다.
