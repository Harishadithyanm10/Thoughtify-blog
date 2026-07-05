from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, ConfigDict, field_validator


# ---------- Auth / User ----------

class UserProfileOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    image: Optional[str] = None
    dob: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    username: str
    email: EmailStr
    first_name: Optional[str] = ""
    last_name: Optional[str] = ""
    date_joined: datetime
    profile: Optional[UserProfileOut] = None


class RegisterIn(BaseModel):
    username: str
    email: EmailStr
    password: str
    confirm_password: str

    @field_validator("confirm_password")
    @classmethod
    def passwords_match(cls, v, info):
        if "password" in info.data and v != info.data["password"]:
            raise ValueError("Passwords do not match")
        return v


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class ProfileUpdateIn(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    dob: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    image: Optional[str] = None


# ---------- Category ----------

class CategoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    slug: str


class CategoryCreate(BaseModel):
    name: str


# ---------- Comment ----------

class CommentAuthorOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    username: str


class CommentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    content: str
    date: datetime
    author: CommentAuthorOut
    parent_id: Optional[int] = None
    replies: List["CommentOut"] = []


class CommentCreate(BaseModel):
    content: str
    parent_id: Optional[int] = None


# ---------- Post ----------

class PostAuthorOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    username: str


class PostOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    content: str
    image: Optional[str] = None
    status: str
    section: str
    main_post: bool
    date: datetime
    blog_slug: str
    author: PostAuthorOut
    category: CategoryOut


class PostListOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    image: Optional[str] = None
    status: str
    section: str
    main_post: bool
    date: datetime
    blog_slug: str
    author: PostAuthorOut
    category: CategoryOut


class PostCreate(BaseModel):
    title: str
    content: str
    image: Optional[str] = None
    category_id: int
    status: str = "draft"
    section: str = "recent"
    main_post: bool = False


class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    image: Optional[str] = None
    category_id: Optional[int] = None
    status: Optional[str] = None
    section: Optional[str] = None
    main_post: Optional[bool] = None


class HomeOut(BaseModel):
    posts: List[PostListOut]
    main_post: List[PostListOut]
    recent: List[PostListOut]
    pop: List[PostListOut]
    trending: List[PostListOut]
    categories: List[CategoryOut]


# ---------- Contact ----------

class ContactIn(BaseModel):
    name: str
    email: EmailStr
    message: str
