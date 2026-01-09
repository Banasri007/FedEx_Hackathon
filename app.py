import streamlit as st
from backend.run import run_logic

st.set_page_config(page_title="Hackathon Demo")

st.title("🚀 Project Demo")

user_input = st.text_area("Enter input")

if st.button("Run"):
    with st.spinner("Processing..."):
        result = run_logic(user_input)

    st.success("Output")
    st.write(result)
