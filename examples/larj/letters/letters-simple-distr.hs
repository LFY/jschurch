import Control.Monad
import Data.List

data Pt = T | F deriving (Eq, Show, Ord)

gen_bool_vectors n = sequence $ map (\i -> [T, F]) [1..n]

all_states min_dim max_dim = concat $ map gen_bool_vectors [min_dim..max_dim]

factor_f F = 0.0
factor_f T = log 0.1

factor_t T = 0.0
factor_t F = log 0.1

fwd_prob state = log (1 / 4) + (sum $ map (\_ -> log 0.5) [1..(length state)])
my_state_score state = fwd_prob state + case length state `mod` 2 of
    0 -> sum $ map factor_t state
    _ -> sum $ map factor_f state

norm_const = sum $ map exp $ map my_state_score $ all_states 5 8

main = let
    states = all_states 5 8
    all_state_scores = map (\s -> (s, exp (my_state_score s - log norm_const))) states in do
        forM_ all_state_scores $ \(state, norm_score) ->
            putStrLn $ (foldr (\x y -> show x ++ " " ++ y) (show (head state)) (tail state)) ++ " " ++ show norm_score
