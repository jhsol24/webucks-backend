## Project Flow

1. 회원가입을 한다.
   - email , pw 중 하나라도 입력되지 않으면 `KEY_ERROR`
   - pw 가 8자보다 짧을 경우 `PASSWORD_TOO_SHORT`
   - DB 에서 이미 가입한 email 인지 확인하기 위한 정보를 가져와서 존재하는 유저라면 `EXISTING_USER`
   - 회원가입 성공시 pw 를 토큰화하여 유저 정보를 DB 에 INSERT (bcrypt 사용)
2. 로그인을 한다.
   - DB 에서 request 한 email 을 활용해 유저 데이터를 가져오고, 존재하지 않는 유저이거나 pw 가 틀리면 `INVALID_USER`
   - 정보가 일치하면 `LOGIN_SUCCESS` 메시지와 함께 jwt token 이 발행된다.
3. category 페이지로 이동
   - 로그인 되어 있지 않다면 (request header 에 token 이 없다면) `LOGIN_REQUIRED`
   - token 과 함께 request 하면 해당하는 유저의 id 와 함께 `Welcome! Customer` 메시지, 카테고리 목록 출력
4. product 리스트 가져오기
   - url 은 `''`이므로 `localhost:8000/product` 로 가져온다.
   - categoryId 를 request body 로 입력하여 해당 카테고리의 제품들의 정보를 가져온다.
5. product 상세정보 가져오기
   - url 뒷부분 숫자를 id 로 가져와서 (prameter) req.params 로 넘겨주고 해당하는 데이터를 DB에서 가져온다.





괄호뭔지확인 { 이거 } -> 써야하네? 근데 역할이뭐지 질문해보자

best-practice 에서 안되어있어서 수정한 것들 목록

- list 페이지에서 categoryId 를 안넘겨줬다. dao 에만 있었다.
- req.params 이건 과제였고, 앞에 id 에도 { } 있어야 했다.
- where 절은 group by 뒤에 들어갈 수 없다.

\- 왜 인증인가를 category 에서 하나?
\- 수빈님 또는 정민님 nodemon 질문

