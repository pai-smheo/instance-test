# 저장소 설정 및 push 매뉴얼

Ubuntu 환경에서 GitHub 저장소를 clone하고 변경 사항을 push하는 방법입니다.

## 사전 준비

Git과 GitHub CLI(`gh`)를 설치합니다.

```bash
sudo apt install -y git gh
```

## GitHub 인증

```bash
gh auth login
```

안내에 따라 `GitHub.com`과 `HTTPS`를 선택하고, 웹 브라우저로 로그인하는 방식을 고릅니다. 이 환경에는 로컬 브라우저가 없으므로 자동으로 브라우저가 열리지 않습니다. 터미널에 안내되는 URL을 브라우저가 있는 컴퓨터에서 직접 열고, 터미널에 표시된 일회용 코드를 입력해 인증을 완료합니다.

인증 상태는 다음 명령으로 확인할 수 있습니다.

```bash
gh auth status
```

## 저장소 clone

```bash
git clone https://github.com/pai-smheo/instance-test.git
cd instance-test
```

이미 clone한 저장소에서는 `cd` 명령만 실행하면 됩니다.

## 커밋 작성자 설정

커밋에 사용할 이름과 이메일을 저장소 단위로 설정합니다. 아래 값은 예시이므로 본인 정보로 바꿉니다.

```bash
git config user.name "이름"
git config user.email "이메일 주소"
```

모든 저장소에 동일한 값을 적용하려면 `--global`을 추가할 수 있습니다.

## 파일 커밋 및 push

파일을 수정하거나 추가한 뒤 다음 명령으로 GitHub에 올립니다.

```bash
git add .
git commit -m "변경 내용 요약"
git push -u origin main
```

`main` 브랜치에 업스트림이 이미 설정된 다음부터는 `git push`만 실행해도 됩니다.
