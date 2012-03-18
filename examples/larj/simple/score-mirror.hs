import Control.Monad
import Data.List

domain_size = 2
min_dim = 3
max_dim = 12

gen_int_vectors num_dims = sequence $ map (\i -> [0..(domain_size - 1)]) [1..num_dims]

all_states = concat $ map gen_int_vectors [min_dim..max_dim]

factor_eq x y = case x `compare` y of
    EQ -> 0.0
    _ -> log 0.01

factor_not_eq x y = case x `compare` y of
    EQ -> log 0.01
    _ -> 0.0


fwd_prob state = log (1 / (max_dim - min_dim + 1)) + (sum $ (map (\_ -> log (1 / (fromIntegral domain_size))) [1..(length state)]))

my_state_score state = fwd_prob state + 
    (let
        n = length state `div` 2
        first_half = take n state 
        second_half = take n (reverse state) in
            (sum $ zipWith factor_eq first_half second_half) +
            (sum $ zipWith factor_not_eq first_half (tail first_half)) +
            (sum $ zipWith factor_not_eq second_half (tail second_half)))
    

norm_const = sum $ map (\x -> exp (my_state_score x)) $ all_states
   
main = let
    all_state_scores = map (\s -> (s, exp (my_state_score s - log norm_const))) all_states in do
        forM_ all_state_scores $ \(state, norm_score) ->
            putStrLn $ "state" ++ " " ++ (foldr (\x y -> show x ++ " " ++ y) (show (head state)) (tail state)) ++ " score " ++ show norm_score
