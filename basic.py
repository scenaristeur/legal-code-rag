from query.query_engine import create_query_engine

query_engine = create_query_engine()

response = query_engine.query("What are the conditions required for a marriage to be considered valid in ?")

print(response)