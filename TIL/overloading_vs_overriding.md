# overloading vs overriding

> 공부하다가 예전에 배운 이 두 개념에 대해서 궁금해졌다. 상속하고도 비교해 보자

자바에서는 다형성을 지원하는 방법으로 메소드 오버로딩과 오버라이딩이 있는데

이름이 비슷하여 헷갈리는 개념이다

## 오버로딩 (overloading)

같은 이름의 메소드를 여러 개 가지면서 매개변수의 유형과 개수가 다르도록 하는 기술

## 오버라이딩 (overriding)

상위 클래스가 가지고 있는 메소드를 하위 클래스가 재정의 해서 사용한다.

### 1. 오버로딩

오버로딩은 메소드 오버로딩과 생성자 오버로딩이 있고 둘다 같은 개념이다.

같은 이름의 함수를 여러 개 정의하고, 매개 변수의 유형과 개수를 다르게 하여 다양한 유형의 호출에 응답하게 한다.

```java
public class Overloadingtest(

  // test 호출
  void test(){
    System.out.println("매개변수 없음");
  }

  // test에 매개 변수로 int형 2개 호출
  void test(int a, int b){
    System.out.println("매개변수" + a + "와" + b);
  }

  // test에 매개변수 double형 1개 호출
  void test(double d){
    System.out.println("매개변수" + d);
  }
)
```

```java
// test.java

public class test{
  public static void main(String[] args){
    Overloadingtest ob = new Overloadingtest();

    ob.test();

    ob.test(10,20);

    ob.test(50);

    ob.test(123.4);
  }
}
```

예제에서와 같이 test라는 같은 이름의 메소드를 여러개 정의하고 매개변수만 변경하여 선언했을 때, 호출 매개변수에 따라 매칭되어 함수를 실행시킨다.

### 2. 오버라이딩(Overriding)

상위 클래스가 가지고 있는 멤버변수가 하위 클래스로 상속되는 것처럼 상위 클래스가 가지고 있는 메소드도 하위 클래스로 상속되어 하위 클래스에서 사용할 수 있다. 하지만 하위 클래스에서 메소드를 재정의해서 사용할 수 있다.

상속 관계에 있는 클래스 간에 같은 이름의 메소드를 정희하는 시술을 오버라이딩이라고 한다.

```java
public class Employee(
  public String name;
  public int age;

  public void print(){
    System.out.println("사원의 이름은" + this.name + "이고 나이는" + this.age + "입니다" );
  }
)

public class Manager extends Employee(
  String jobOfManage;

  //print 메소드 오버라이딩
  public void print(){
    System.out.println("사원의 이름은" + this.name + "이고 나이는" + this.age + "입니다");
    System.out.println("관리자" + this.name + "은" + this.jobOfManage + "담당입니다");
  }
)
```

```java
// test.java
public class test(
  public class void main (String[] args){
    Manager lee = new Manager();

    lee.name = "하이언";
    lee.age = "30";
    lee.jobOfManage = "developer";

    lee.print();
  }
)
```

### 3. 오버로딩과 오버라이딩의 성립조건

| 구분       | 오버로딩 | 오버로딩 |
| -------- | ---- | ---- |
| 메소드 이름   | 동일   | 동일   |
| 매개변수, 타입 | 다름   | 동일   |
| 리턴 타입    | 상관없음 | 동일   |

### 4. 상속이랑 오버라이딩이랑의 비교

큰 범주안에서는 오버라이딩, 오버로딩 둘다 상속에 속한다.

상속이란 자식 클래스에서 부모 클래스의 필드와 메소드를 참조하여 쓸수 있게 해준다. **기본적으로 하나의 클래스에 하나의 슈퍼 클래스 밖에 상속할 수 없다.**